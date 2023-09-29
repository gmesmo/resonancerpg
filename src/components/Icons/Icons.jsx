import { useState, useEffect } from "react";

const Trash = (props) => {
  const size = props.size;

  return (
    <svg
      width={`${size}px`}
      height={`${size}`}
      viewBox="0 0 24.00 24.00"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      transform="rotate(0)"
      stroke="#000000"
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
        stroke="#CCCCCC"
        strokeWidth="0.096"
      ></g>
      <g id="SVGRepo_iconCarrier">
        {" "}
        <path
          d="M10 12L14 16M14 12L10 16M18 6L17.1991 18.0129C17.129 19.065 17.0939 19.5911 16.8667 19.99C16.6666 20.3412 16.3648 20.6235 16.0011 20.7998C15.588 21 15.0607 21 14.0062 21H9.99377C8.93927 21 8.41202 21 7.99889 20.7998C7.63517 20.6235 7.33339 20.3412 7.13332 19.99C6.90607 19.5911 6.871 19.065 6.80086 18.0129L6 6M4 6H20M16 6L15.7294 5.18807C15.4671 4.40125 15.3359 4.00784 15.0927 3.71698C14.8779 3.46013 14.6021 3.26132 14.2905 3.13878C13.9376 3 13.523 3 12.6936 3H11.3064C10.477 3 10.0624 3 9.70951 3.13878C9.39792 3.26132 9.12208 3.46013 8.90729 3.71698C8.66405 4.00784 8.53292 4.40125 8.27064 5.18807L8 6"
          stroke="#000000"
          strokeWidth="1.08"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></path>{" "}
      </g>
    </svg>
  );
};

const Body = ({ current, max, size }) => {
  // Estado local para a porcentagem
  const [percentHP, setPercentHP] = useState(100);

  // Atualiza a porcentagem sempre que current ou max mudar
  useEffect(() => {
    const newPercentHP = (current * 100) / max;

    // Verifica se o valor aumentou ou diminuiu em relação ao percentHP atual
    if (newPercentHP !== percentHP) {
      animatePercent(newPercentHP);
    }
  }, [current, max]);

  // Função para animar o offset suavemente até o valor atual
  const animatePercent = (targetPercent) => {
    const duration = 150; // Duração da animação em milissegundos
    const startPercent = percentHP;

    const startTime = Date.now();

    const updatePercent = () => {
      const currentTime = Date.now();
      const elapsedTime = currentTime - startTime;

      if (elapsedTime < duration) {
        const newPercent =
          startPercent +
          (targetPercent - startPercent) * (elapsedTime / duration);
        setPercentHP(newPercent);
        requestAnimationFrame(updatePercent);
      } else {
        setPercentHP(targetPercent); // Define o valor final quando a animação estiver concluída
      }
    };

    requestAnimationFrame(updatePercent);
  };

  return (
    <>
      <div
        style={{
          position: "relative",
          width: `${size}px`,
          height: `${size}px`,
        }}
      >
        <svg
          viewBox="0 2 22 20"
          fill="none"
          stroke="currentColor"
          height={`${size}px`}
          width={`${size}px`}
        >
          <defs>
            <linearGradient id="gradient" x1="0%" y1="100%" x2="0%" y2="0%">
              <stop offset={`${percentHP}%`} style={{ stopColor: "red" }} />
              <stop
                offset={`${percentHP}%`}
                style={{ stopColor: "transparent" }}
              />
            </linearGradient>
          </defs>
          <path
            d="M15.7 4C18.87 4 21 6.98 21 9.76C21 15.39 12.16 20 12 20C11.84 20 3 15.39 3 9.76C3 6.98 5.13 4 8.3 4C10.12 4 11.31 4.91 12 5.71C12.69 4.91 13.88 4 15.7 4Z"
            fill="url(#gradient)"
            stroke="currentColor"
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </>
  );
};

const Shield = ({ size }) => {
  return (
    <svg
      width={`${size}px`}
      height={`${size}px`}
      viewBox="0 1 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        {" "}
        <path
          d="M11.302 21.6149C11.5234 21.744 11.6341 21.8086 11.7903 21.8421C11.9116 21.8681 12.0884 21.8681 12.2097 21.8421C12.3659 21.8086 12.4766 21.744 12.698 21.6149C14.646 20.4784 20 16.9084 20 12V6.6C20 6.04207 20 5.7631 19.8926 5.55048C19.7974 5.36198 19.6487 5.21152 19.4613 5.11409C19.25 5.00419 18.9663 5.00084 18.3988 4.99413C15.4272 4.95899 13.7136 4.71361 12 3C10.2864 4.71361 8.57279 4.95899 5.6012 4.99413C5.03373 5.00084 4.74999 5.00419 4.53865 5.11409C4.35129 5.21152 4.20259 5.36198 4.10739 5.55048C4 5.7631 4 6.04207 4 6.6V12C4 16.9084 9.35396 20.4784 11.302 21.6149Z"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></path>{" "}
      </g>
    </svg>
  );
};

const Ego = ({ current, max, size }) => {
  // Calcular a porcentagem atual
  const percentEgo = (current * 100) / max;

  return (
    <div
      style={{ position: "relative", width: `${size}px`, height: `${size}px` }}
    >
      {/* Elemento base */}
      <svg
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{
          position: "absolute",
          top: "0",
          left: "0",
          width: "100%",
          height: "100%",
        }}
      >
        <path d="M15.0007 12C15.0007 13.6569 13.6576 15 12.0007 15C10.3439 15 9.00073 13.6569 9.00073 12C9.00073 10.3431 10.3439 9 12.0007 9C13.6576 9 15.0007 10.3431 15.0007 12Z" />
        <path d="M12.0012 5C7.52354 5 3.73326 7.94288 2.45898 12C3.73324 16.0571 7.52354 19 12.0012 19C16.4788 19 20.2691 16.0571 21.5434 12C20.2691 7.94291 16.4788 5 12.0012 5Z" />
      </svg>

      {/* Elemento de preenchimento */}
      <svg
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        fill="purple"
        style={{
          position: "absolute",
          top: "0",
          left: "0",
          zIndex: "-1",
          width: "100%",
          height: "100%",
          clipPath: `inset(${100 - percentEgo}% 0 0 0)`,
        }}
      >
        <path d="M15.0007 12C15.0007 13.6569 13.6576 15 12.0007 15C10.3439 15 9.00073 13.6569 9.00073 12C9.00073 10.3431 10.3439 9 12.0007 9C13.6576 9 15.0007 10.3431 15.0007 12Z" />
        <path d="M12.0012 5C7.52354 5 3.73326 7.94288 2.45898 12C3.73324 16.0571 7.52354 19 12.0012 19C16.4788 19 20.2691 16.0571 21.5434 12C20.2691 7.94291 16.4788 5 12.0012 5Z" />
      </svg>
    </div>
  );
};

export { Trash, Body, Shield, Ego };

// {`${size}px`}
