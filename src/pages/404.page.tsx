import { PageContainer } from "@/components/PageContainer/PageContainer";
import { LoadingOverlay } from "@/containers/LoadingOverlay/LoadingOverlay";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function NotFoundPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/");
    }, 3000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <>
      <PageContainer>
        <LoadingOverlay
          texts={["페이지를 찾을 수 없어요", "404 Not Found"]}
          time={2500}
          manual
        />
      </PageContainer>
    </>
  );
}
