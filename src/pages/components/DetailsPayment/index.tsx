import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "./styles.module.scss";

interface PaymentDetails {
  customer: string;
  id: string;
  cycle: string;
  dateCreated: string;
  value: number;
  billingType: string;
  creditCard: {
    creditCardNumber: string;
  };
  nextDueDate: string;
}

export default function PaymentDetailsPage() {
  const [paymentDetails, setPaymentDetails] = useState<PaymentDetails | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);
  const [showConfirmCancel, setShowConfirmCancel] = useState(false);
  const [showDevelopmentModal, setShowDevelopmentModal] = useState(false);

  useEffect(() => {
    const paymentId = localStorage.getItem("paymentId");

    const fetchPaymentDetails = async () => {
      try {
        const response = await fetch("/api/checkSubscriptionStatus", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ paymentId }),
        });

        if (response.ok) {
          const data: PaymentDetails = await response.json();
          setPaymentDetails(data);
        } else {
          throw new Error("Erro ao buscar detalhes do pagamento");
        }
      } catch (error) {
        toast.error("Erro ao carregar detalhes do pagamento");
        console.error("Erro ao buscar detalhes do pagamento:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (paymentId) {
      fetchPaymentDetails();
    }
  }, []);

  if (isLoading) {
    return <p>Carregando...</p>;
  }

  const handleOpenConfirmCancel = (e: { preventDefault: () => void }) => {
    e.preventDefault(); // Impede a ação padrão do link ou botão
    setShowConfirmCancel(true);
  };

  const handleCloseConfirmCancel = () => {
    setShowConfirmCancel(false);
  };

  const handleConfirmCancel = async () => {
    const paymentId = paymentDetails?.id;

    if (!paymentId) {
      toast.error("ID do pagamento não encontrado");
      return;
    }

    try {
      const response = await fetch(`/api/cancelSubscription`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: paymentId }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.deleted) {
          toast.success("Assinatura cancelada com sucesso");
          setShowConfirmCancel(false);
          setPaymentDetails(null);
        } else {
          throw new Error("Falha ao cancelar a assinatura");
        }
      } else {
        throw new Error("Erro ao cancelar a assinatura");
      }
    } catch (error) {
      toast.error("Erro ao cancelar a assinatura");
      console.error("Erro ao cancelar a assinatura:", error);
    }
  };

  const handleOpenDevelopmentModal = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setShowDevelopmentModal(true);
  };

  const handleCloseDevelopmentModal = () => {
    setShowDevelopmentModal(false);
  };

  return (
    <>
      <ToastContainer />
      <div className={styles.container}>
        <div className={styles.titleContainer}>
          <p className={styles.title}>Detalhes do pagamento</p>
        </div>

        {paymentDetails ? (
          <div className={styles.details}>
            <div className={styles.detailsData}>
              <p className={styles.dataTitle}>Id do cliente</p>
              <p className={styles.dataValue}>{paymentDetails.customer}</p>
            </div>

            <hr className={styles.separetor} />

            <div className={styles.detailsData}>
              <p className={styles.dataTitle}>Id do pagamento</p>
              <p className={styles.dataValue}>{paymentDetails.id}</p>
            </div>

            <hr className={styles.separetor} />

            <div className={styles.detailsData}>
              <p className={styles.dataTitle}>Entrada no clube</p>
              <p className={styles.dataValue}>
                {new Date(paymentDetails.dateCreated).toLocaleDateString()}
              </p>
            </div>

            <hr className={styles.separetor} />

            <div className={styles.detailsData}>
              <p className={styles.dataTitle}>Modalidade de recorrência</p>
              <p className={styles.dataValue}>{paymentDetails.cycle}</p>
            </div>

            <hr className={styles.separetor} />

            <div className={styles.detailsData}>
              <p className={styles.dataTitle}>Valor da assinatura</p>
              <p className={styles.dataValue}>
                R$ {paymentDetails.value.toFixed(2)}
              </p>
            </div>

            <hr className={styles.separetor} />

            <div className={styles.detailsData}>
              <p className={styles.dataTitle}>Forma de pagamento</p>
              <p className={styles.dataValue}>{paymentDetails.billingType}</p>
            </div>

            <hr className={styles.separetor} />

            <div className={styles.detailsData}>
              <p className={styles.dataTitle}>Cartão utilizado</p>
              <p className={styles.dataValue}>
                **** **** **** {paymentDetails.creditCard.creditCardNumber}
              </p>
            </div>

            <hr className={styles.separetor} />

            <div className={styles.detailsData}>
              <p className={styles.dataTitle}>Vencimento da assinatura</p>
              <p className={styles.dataValue}>
                {new Date(paymentDetails.nextDueDate).toLocaleDateString()}
              </p>
            </div>
          </div>
        ) : (
          <p>Erro ao carregar detalhes do pagamento</p>
        )}

        <div className={styles.buttons}>
          <button
            className={styles.cancelButton}
            onClick={handleOpenConfirmCancel}
          >
            Cancelar assinatura
          </button>
          <button
            className={styles.editButton}
            onClick={handleOpenDevelopmentModal}
          >
            Alternar cartão
          </button>
        </div>
      </div>

      {showConfirmCancel && (
        <div className={styles.confirmOverlay}>
          <div className={styles.confirmBox}>
            <p>
              Tem certeza que deseja cancelar a assinatura? Todos os acessos ao
              clube de benefícios serão perdidos.
            </p>
            <button
              onClick={handleCloseConfirmCancel}
              className={styles.cancel}
            >
              Voltar
            </button>
            <button onClick={handleConfirmCancel} className={styles.confirm}>
              Confirmar
            </button>
          </div>
        </div>
      )}

      {showDevelopmentModal && (
        <div className={styles.confirmOverlay}>
          <div className={styles.confirmBox}>
            <p>
              Esta funcionalidade está em manutenção, desde já pedimos desculpa
              pelo transtorno. Se necessário, entre em contato pelo email
              oficial
            </p>
            <button
              onClick={handleCloseDevelopmentModal}
              className={styles.confirm}
            >
              OK
            </button>
          </div>
        </div>
      )}
    </>
  );
}
