import { useConvexAuth, useMutation, useQuery } from "convex/react";
import { useEffect, useState } from "react";
import { api } from "../../convex/_generated/api";

export function useAdmin() {
    const { isAuthenticated, isLoading: isAuthLoading } = useConvexAuth();
    const user = useQuery(api.users.currentUser);
    const storeUser = useMutation(api.users.store);
    const [hasAttemptedSync, setHasAttemptedSync] = useState(false);

    useEffect(() => {
        // If we're authenticated but the user record doesn't exist yet, try to sync.
        if (isAuthenticated && user === null && !hasAttemptedSync) {
            setHasAttemptedSync(true);
            storeUser().catch(err => {
                console.error("Critical: Admin sync failed", err);
            });
        }
    }, [isAuthenticated, user, storeUser, hasAttemptedSync]);

    // isLoading is true while Convex is initializing its auth state,
    // or if we are authenticated but the user query hasn't returned yet.
    const isLoading = isAuthLoading || (isAuthenticated && user === undefined);

    return {
        isAdmin: isAuthenticated,
        isLoading,
        user, // Can be undefined (loading), null (not found), or User object
    };
}
