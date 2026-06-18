import { Outlet } from "react-router-dom";
import { useAppDispatch } from "./hooks/hooks";
import { useEffect } from "react";
import { useCheckAuth } from "./api/authApi";
import { setUser } from "./redux/slice/authSlice";
import FooterComponents from "./components/FooterComponents";
import { Toaster } from "./components/ui/sonner";

export default function App() {
  const dispatch = useAppDispatch();
  const { data: user, isError } = useCheckAuth();

  useEffect(() => {
    if (user) {
      dispatch(setUser(user));
    }

    if (isError) {
      dispatch(setUser(null));
    }
  }, [user, dispatch, isError]);
  return (
    <div>
      <Toaster />
      <Outlet />
      <FooterComponents />
    </div>
  );
}
