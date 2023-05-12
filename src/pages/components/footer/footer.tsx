import Image from "next/image";
import Duvidas from "../../../../public/Duvidas.png";
import Email from "../../../../public/Email.png";
import Celular from "../../../../public/Vector.png";
import Wpp from "../../../../public/Whatszaap.png";
import LogoEscura from "../../../../public/logoEscura 2.png";

function footer() {
  return (
    <div className="container-Footer" id="contato">
      <div className="content-footer">
        <div className="logo-footer-container">
          <div className="Logo-Footer">
            <Image className="logo-Escura" src={LogoEscura} alt="Logo-Escura" />
            <p className="Slogan">
              Os Melhores benefícios <br />
              na palma da mão
            </p>
          </div>
        </div>
        <div className="Contato-Footer">
          <h2>Contato</h2>
          <div className="listaContato-Footer">
            <div>
              <Image className="Icon-Footer" src={Celular} alt="Celular" />
              <h3>(61) 99354-6881</h3>
            </div>

            <div>
              <Image className="Icon-Footer" src={Wpp} alt="Whatszaap" />
              <h3>(61) 99354-6881</h3>
            </div>

            <div className="email">
              <Image className="Icon-Footer" src={Email} alt="Email" />
              <h3>atendimento@temmaisvantagens.com.br</h3>
            </div>

            <div>
              <Image
                className="Icon-Footer-duvidas"
                src={Duvidas}
                alt="Duvidas"
              />
              <a href="#">
                <h3>Como Funciona</h3>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default footer;
