/** Original code-native scenery. The supplied fairy remains the only mascot. */
export function WorldArt({ variant = "home" }: { variant?: "home" | "map" }) {
  return (
    <svg
      className={`world-art world-art-${variant}`}
      viewBox="0 0 1440 850"
      preserveAspectRatio="xMidYMax slice"
      fill="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={`sky-${variant}`} x2="0" y2="1">
          <stop stopColor="#e5f0df" />
          <stop offset="1" stopColor="#f9e8af" />
        </linearGradient>
        <linearGradient id={`hill-${variant}`} x2="0" y2="1">
          <stop stopColor="#aac38a" />
          <stop offset="1" stopColor="#6a945e" />
        </linearGradient>
        <pattern
          id={`grain-${variant}`}
          width="19"
          height="19"
          patternUnits="userSpaceOnUse"
        >
          <circle cx="2" cy="3" r=".7" fill="#234d37" opacity=".07" />
          <circle cx="12" cy="13" r=".6" fill="#fff" opacity=".25" />
        </pattern>
      </defs>
      <path fill={`url(#sky-${variant})`} d="M0 0h1440v850H0z" />
      <circle cx="1070" cy="195" r="130" fill="#fbf4ce" opacity=".8" />
      <path d="M0 440Q210 270 450 430T900 400T1440 370V850H0Z" fill="#c2d2a6" />
      <path
        d="M0 540Q230 400 550 530T1050 490T1440 520V850H0Z"
        fill={`url(#hill-${variant})`}
      />
      <path d="M0 690Q360 520 730 650T1440 580V850H0Z" fill="#719663" />
      <path
        d="M860 470C850 560 620 550 670 650S1020 720 870 850"
        stroke="#d8cd95"
        strokeWidth="88"
      />
      <path
        d="M860 470C850 560 620 550 670 650S1020 720 870 850"
        stroke="#f7e9b7"
        strokeWidth="66"
      />
      <g opacity=".65" fill="#4c7757">
        <path d="M170 300l-80 180h160z" />
        <path d="M220 250l-90 200h180z" />
        <path d="M1310 280l-90 205h180z" />
        <path d="M1240 340l-70 170h140z" />
      </g>
      <g transform="translate(1100 475) rotate(8)">
        <path
          d="M-110 10Q-60-80 0-65Q60-80 110 10L100 105Q55 80 0 105Q-55 80-100 105Z"
          fill="#fff3c8"
          stroke="#446947"
          strokeWidth="6"
        />
        <path d="M0-65V105" stroke="#bdb17e" strokeWidth="4" />
        <path
          d="M-120 10L0-100L120 10"
          stroke="#416746"
          strokeWidth="20"
          strokeLinejoin="round"
        />
        <path d="M-30 100V55a30 30 0 0160 0v45" fill="#b47640" />
        <circle cx="-55" cy="25" r="13" fill="#e8b64b" />
        <circle cx="55" cy="25" r="13" fill="#e8b64b" />
      </g>
      <g fill="#2b6045">
        <path d="M0 0H170Q70 190 110 370Q45 400 0 390Z" />
        <path d="M1440 0H1345Q1420 175 1340 420L1440 470Z" />
      </g>
      <g fill="#3e7450">
        <ellipse
          cx="60"
          cy="60"
          rx="250"
          ry="100"
          transform="rotate(15 60 60)"
        />
        <ellipse
          cx="1410"
          cy="90"
          rx="200"
          ry="125"
          transform="rotate(-20 1410 90)"
        />
      </g>
      <g fill="#62905b">
        <ellipse
          cx="180"
          cy="15"
          rx="155"
          ry="51"
          transform="rotate(20 180 15)"
        />
        <ellipse
          cx="1290"
          cy="20"
          rx="150"
          ry="50"
          transform="rotate(-14 1290 20)"
        />
      </g>
      <g fill="#d8e4b2">
        <ellipse
          cx="80"
          cy="210"
          rx="13"
          ry="35"
          transform="rotate(-40 80 210)"
        />
        <ellipse
          cx="1320"
          cy="210"
          rx="12"
          ry="34"
          transform="rotate(35 1320 210)"
        />
      </g>
      <path d="M0 790Q100 710 235 810Q390 730 520 850H0Z" fill="#355f43" />
      <path
        d="M1040 850Q1140 720 1250 790Q1380 710 1440 760V850Z"
        fill="#315d42"
      />
      <g stroke="#b0c78c" strokeWidth="5" strokeLinecap="round">
        <path d="M75 820l25-80m-11 38l-25-22m33 5l25-22M1330 815l-20-90m7 36l25-19m-28 36l-30-21" />
      </g>
      <g fill="#f2cc62">
        <circle cx="275" cy="700" r="5" />
        <circle cx="300" cy="715" r="4" />
        <circle cx="1190" cy="690" r="4" />
        <circle cx="1220" cy="705" r="5" />
      </g>
      <g transform="translate(175 740)">
        <path d="M0 0v45m35-23v32" stroke="#f9e6b8" strokeWidth="13" />
        <path d="M-25 5Q0-45 25 5ZM17 27Q35-8 53 27Z" fill="#cf7957" />
        <circle cx="-5" cy="-3" r="5" fill="#ffeecb" />
        <circle cx="37" cy="19" r="4" fill="#ffeecb" />
      </g>
      <path fill={`url(#grain-${variant})`} d="M0 0h1440v850H0z" />
    </svg>
  );
}
