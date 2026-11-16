"use client";

import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { 
  UserProfile, 
  loginWithGoogleFirebase, 
  logoutUserFirebase, 
  activateSubscriptionInDB, 
  auth, 
  db,
  isFirebaseConfigured,
  LOCAL_USER_KEY,
  GLOBAL_SUBSCRIBED_KEY
} from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

interface AuthContextType {
  user: UserProfile | null;
  loading: boolean;
  loginWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  activateSubscription: (method?: string, paymentDetails?: { paymentId?: string; orderId?: string; amount?: number }) => Promise<void>;
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
  isSubscribeModalOpen: boolean;
  setIsSubscribeModalOpen: (open: boolean) => void;
  isStudioOpen: boolean;
  setIsStudioOpen: (open: boolean) => void;
  requireAuthAndSubscription: (action: () => void) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isSubscribeModalOpenState, setIsSubscribeModalOpenState] = useState(false);
  const [isStudioOpen, setIsStudioOpen] = useState(false);

  const setIsSubscribeModalOpen = (open: boolean) => {
    setIsSubscribeModalOpenState(open);
  };

  useEffect(() => {
    // Check if live Firebase is active
    if (isFirebaseConfigured && auth) {
      const unsubscribe = onAuthStateChanged(auth, async (fbUser) => {
        if (fbUser) {
          try {
            let profileData: UserProfile | null = null;
            if (db) {
              const snap = await getDoc(doc(db, "users", fbUser.uid));
              if (snap.exists()) {
                profileData = snap.data() as UserProfile;
              }
            }

            // Also check localStorage subscription cache
            const isGloballySubscribed = typeof window !== "undefined" && 
              localStorage.getItem(GLOBAL_SUBSCRIBED_KEY) === "true";

            if (isGloballySubscribed) {
              if (profileData) {
                profileData.isSubscribed = true;
                profileData.plan = profileData.plan === "none" ? "pro_3000" : profileData.plan;
                profileData.promptsRemaining = 9999;
              } else {
                profileData = {
                  uid: fbUser.uid,
                  email: fbUser.email,
                  displayName: fbUser.displayName || "CAD Pro Architect",
                  photoURL: null,
                  isSubscribed: true,
                  plan: "pro_3000",
                  promptsRemaining: 9999,
                };
              }
            }

            if (profileData) {
              setUser(profileData);
              setLoading(false);
              return;
            }

            setUser({
              uid: fbUser.uid,
              email: fbUser.email,
              displayName: fbUser.displayName,
              photoURL: null,
              isSubscribed: false,
              plan: "none",
              promptsRemaining: 3,
            });
          } catch (e) {
            console.error("Error reading user state:", e);
          }
        } else {
          setUser(null);
        }
        setLoading(false);
      });

      return () => unsubscribe();
    } else {
      // Local demo mode restore
      const saved = typeof window !== "undefined" 
        ? (localStorage.getItem(LOCAL_USER_KEY) || localStorage.getItem("cadgpt_current_user"))
        : null;
      const isGloballySubscribed = typeof window !== "undefined" && 
        localStorage.getItem(GLOBAL_SUBSCRIBED_KEY) === "true";

      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          if (isGloballySubscribed) {
            parsed.isSubscribed = true;
            parsed.promptsRemaining = 9999;
          }
          setUser(parsed);
        } catch {
          // ignore
        }
      }
      setLoading(false);
    }
  }, []);

  const loginWithGoogle = async () => {
    try {
      setLoading(true);
      const profile = await loginWithGoogleFirebase();
      setUser(profile);
      setIsAuthModalOpen(false);

      // Agar user subscribed nahi hai to ₹99 subscription modal kholo
      // Aur agar subscribed hai to unka Active License Certificate dashboard kholo!
      setTimeout(() => {
        setIsSubscribeModalOpenState(true);
      }, 400);
    } catch (err) {
      console.error("Login failed:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    await logoutUserFirebase();
    setUser(null);
    setLoading(false);
  };

  const activateSubscription = async (
    method: string = "UPI / Razorpay Instant",
    paymentDetails?: { paymentId?: string; orderId?: string; amount?: number }
  ) => {
    if (!user) {
      setIsAuthModalOpen(true);
      return;
    }

    try {
      const paymentId = paymentDetails?.paymentId || ("PAY_" + Math.random().toString(36).substring(2, 10).toUpperCase());
      const orderId = paymentDetails?.orderId || ("ORDER_" + Date.now());
      const amount = paymentDetails?.amount || 3000;

      const updated = await activateSubscriptionInDB(user.uid, {
        plan: "pro_3000",
        paymentId,
        orderId,
        paymentMethod: method,
        amount,
        email: user.email,
        displayName: user.displayName,
      });
      setUser(updated);
      // Keep modal open so the user immediately sees the Active License Dashboard
      setIsSubscribeModalOpenState(true);
    } catch (err) {
      console.error("Subscription error:", err);
      throw err;
    }
  };

  const requireAuthAndSubscription = (action: () => void) => {
    if (!user) {
      setIsAuthModalOpen(true);
      return;
    }
    if (!user.isSubscribed) {
      setIsSubscribeModalOpenState(true);
      return;
    }
    action();
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        loginWithGoogle,
        logout,
        activateSubscription,
        isAuthModalOpen,
        setIsAuthModalOpen,
        isSubscribeModalOpen: isSubscribeModalOpenState,
        setIsSubscribeModalOpen,
        isStudioOpen,
        setIsStudioOpen,
        requireAuthAndSubscription,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
