"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { Fragment } from "react";
import { Row } from "react-bootstrap";

import DashboardStats from "components/dashboard/DashboardStats";

const HomePage = () => {
  const router = useRouter();

  useEffect(() => {
    const hasToken = document.cookie.includes("token");

    if (!hasToken) {
      router.push("/sign-in");
    }
  }, []);
  
  return (
    <Fragment>
      <Row className="g-6 mb-6">
        <DashboardStats />
      </Row>
    </Fragment>
  );
};

export default HomePage;
