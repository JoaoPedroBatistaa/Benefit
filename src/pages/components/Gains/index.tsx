import { useState } from "react";
import styles from "./styles.module.scss";

export default function FAQ() {
  const [isActive1, setIsActive1] = useState(false);
  const [isActive2, setIsActive2] = useState(false);
  const [isActive3, setIsActive3] = useState(false);
  const [isActive4, setIsActive4] = useState(false);
  const [isActive5, setIsActive5] = useState(false);
  const [isActive6, setIsActive6] = useState(false);
  const [isActive7, setIsActive7] = useState(false);
  const [isActive8, setIsActive8] = useState(false);
  const [isActive9, setIsActive9] = useState(false);
  const [isActive10, setIsActive10] = useState(false);

  return (
    <>
      <div className={styles.container}>
        <div className={styles.titleContainer}>
          <p className={styles.title}>Perguntas Frequentes</p>
        </div>

        <div className={styles.infoContainer}>
          <div className={styles.rightContainer}>
            <div
              className={
                isActive1
                  ? `${styles.professional} ${styles.active}`
                  : styles.professional
              }
            >
              <div
                className={styles.professionalHeader}
                onClick={() => setIsActive1(!isActive1)}
              >
                <p className={styles.professionalTitle}>
                  O que está incluído na assinatura do Clube Poupy?
                </p>
                <img src="/downArrow.svg" alt="" />
              </div>
              <p className={styles.descriptionProf}>
                Com a assinatura do Clube Poupy, você ganha acesso ao maior
                clube de benefícios da América Latina! No nosso portal, você
                encontra descontos e ofertas de mais de 1.600 empresas
                parceiras. Aproveite promoções exclusivas através de links,
                cupons, cashback, vouchers, ou pela sua carteirinha digital!
                Você pode acessar tudo isso pelo site e, em breve, pelo nosso
                app que está quase saindo do forno!
              </p>
            </div>

            <div
              className={
                isActive2
                  ? `${styles.professional} ${styles.active}`
                  : styles.professional
              }
            >
              <div
                className={styles.professionalHeader}
                onClick={() => setIsActive2(!isActive2)}
              >
                <p className={styles.professionalTitle}>
                  O Clube Poupy oferece descontos em quais áreas?
                </p>
                <img src="/downArrow.svg" alt="" />
              </div>
              <p className={styles.descriptionProf}>
                Nosso clube oferece descontos exclusivos em todas as áreas do
                seu dia a dia! Desde vestuário, tecnologia, eletrodomésticos,
                beleza, farmácia, alimentação até serviços para seu veículo,
                viagens, educação, academias, lazer e muito mais! São mais de
                1.600 empresas oferecendo as melhores ofertas para você, todos
                os dias!
              </p>
            </div>

            <div
              className={
                isActive3
                  ? `${styles.professional} ${styles.active}`
                  : styles.professional
              }
            >
              <div
                className={styles.professionalHeader}
                onClick={() => setIsActive3(!isActive3)}
              >
                <p className={styles.professionalTitle}>
                  Como faço para me cadastrar no Clube Poupy?
                </p>
                <img src="/downArrow.svg" alt="" />
              </div>
              <p className={styles.descriptionProf}>
                É fácil! Clique no botão <b>Obter acesso</b> no canto superior
                direito e preencha o formulário com suas informações. Depois,
                você será encaminhado para a página de pagamento, onde pode
                cadastrar seu método de pagamento e ganhar acesso ao Clube
                Poupy!
              </p>
            </div>

            <div
              className={
                isActive4
                  ? `${styles.professional} ${styles.active}`
                  : styles.professional
              }
            >
              <div
                className={styles.professionalHeader}
                onClick={() => setIsActive4(!isActive4)}
              >
                <p className={styles.professionalTitle}>
                  Quais são as opções de pagamento disponíveis?
                </p>
                <img src="/downArrow.svg" alt="" />
              </div>
              <p className={styles.descriptionProf}>
                Atualmente, aceitamos apenas pagamento recorrente via cartão de
                crédito por apenas R$9,90/mês!
              </p>
            </div>

            <div
              className={
                isActive5
                  ? `${styles.professional} ${styles.active}`
                  : styles.professional
              }
            >
              <div
                className={styles.professionalHeader}
                onClick={() => setIsActive5(!isActive5)}
              >
                <p className={styles.professionalTitle}>
                  O que acontece se meu pagamento falhar?
                </p>
                <img src="/downArrow.svg" alt="" />
              </div>
              <p className={styles.descriptionProf}>
                Se o pagamento for recusado, verifique se todas as informações
                estão corretas e se sua conta não tem pendências com o banco. Se
                tudo estiver certo e o problema continuar, entre em contato com
                nossa equipe pelo email atendimento@clubepoupy.com.br e nós te
                ajudaremos a resolver o problema!
              </p>
            </div>

            <div
              className={
                isActive6
                  ? `${styles.professional} ${styles.active}`
                  : styles.professional
              }
            >
              <div
                className={styles.professionalHeader}
                onClick={() => setIsActive6(!isActive6)}
              >
                <p className={styles.professionalTitle}>
                  Como faço para realizar o login na minha conta?
                </p>
                <img src="/downArrow.svg" alt="" />
              </div>
              <p className={styles.descriptionProf}>
                Se você já tem uma conta, clique no botão <b>Fazer login</b> no
                menu superior e preencha com seu email cadastrado e senha.
              </p>
            </div>

            <div
              className={
                isActive7
                  ? `${styles.professional} ${styles.active}`
                  : styles.professional
              }
            >
              <div
                className={styles.professionalHeader}
                onClick={() => setIsActive7(!isActive7)}
              >
                <p className={styles.professionalTitle}>
                  Esqueci minha senha. Como posso redefini-la?
                </p>
                <img src="/downArrow.svg" alt="" />
              </div>
              <p className={styles.descriptionProf}>
                Para redefinir sua senha, clique no botão{" "}
                <b>esqueci minha senha</b> na página de login e siga as
                instruções. Vamos enviar uma nova senha temporária para o seu
                email cadastrado. Use essa senha para acessar sua conta e,
                depois, escolha uma nova senha em <b>meu perfil</b>{" "}
                <b>trocar minha senha</b>.
              </p>
            </div>

            <div
              className={
                isActive8
                  ? `${styles.professional} ${styles.active}`
                  : styles.professional
              }
            >
              <div
                className={styles.professionalHeader}
                onClick={() => setIsActive8(!isActive8)}
              >
                <p className={styles.professionalTitle}>
                  Como posso acessar minhas informações de perfil?
                </p>
                <img src="/downArrow.svg" alt="" />
              </div>
              <p className={styles.descriptionProf}>
                Depois de fazer login, clique em <b>meu perfil</b> no menu
                superior. Lá você encontra todas as informações sobre sua conta,
                pagamento, acesso ao clube e a opção de sair do perfil.
              </p>
            </div>

            <div
              className={
                isActive9
                  ? `${styles.professional} ${styles.active}`
                  : styles.professional
              }
            >
              <div
                className={styles.professionalHeader}
                onClick={() => setIsActive9(!isActive9)}
              >
                <p className={styles.professionalTitle}>
                  Como posso acessar o Clube de benefícios?
                </p>
                <img src="/downArrow.svg" alt="" />
              </div>
              <p className={styles.descriptionProf}>
                Para acessar o Clube Poupy e todas as suas vantagens, faça login
                na sua conta e certifique-se de que o pagamento da assinatura
                está em dia. Depois, clique em <b>Acessar clube</b> no menu
                superior ou dentro de <b>meu perfil</b>.
              </p>
            </div>

            <div
              className={
                isActive10
                  ? `${styles.professional} ${styles.active}`
                  : styles.professional
              }
            >
              <div
                className={styles.professionalHeader}
                onClick={() => setIsActive10(!isActive10)}
              >
                <p className={styles.professionalTitle}>
                  Existe um aplicativo móvel para o Clube Poupy?
                </p>
                <img src="/downArrow.svg" alt="" />
              </div>
              <p className={styles.descriptionProf}>
                Nosso app Clube Poupy está passando pelos últimos ajustes e, em
                breve, todos os membros poderão conferir todas as ofertas por
                lá! Ele estará disponível para iOS (Apple) e Android. Fique de
                olho nas nossas redes sociais para não perder nenhuma novidade e
                desconto! Siga-nos: @clubepoupy
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
