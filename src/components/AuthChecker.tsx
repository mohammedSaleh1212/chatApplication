import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../AuthStore";

interface Props {
  children: React.ReactNode;
}

const AuthChecker = ({ children }: Props) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth.currentUser) {
      navigate("/");
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return <>{children}</>;
};

export default AuthChecker;