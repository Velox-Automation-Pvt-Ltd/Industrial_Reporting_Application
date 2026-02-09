import styled from 'styled-components';

interface TitleTextProps {
  title: string | React.ReactNode;
  style?: string;
}
function TitleText({ title, style }: TitleTextProps) {
  return (
    <>
      <h2
        className={`bg-clip-text text-transparent text-center bg-gradient-to-b from-neutral-900 to-neutral-700 dark:from-neutral-600 dark:to-white text-3xl md:text-4xl lg:text-4xl font-sans py-2 relative z-20 font-semibold tracking-tight ${style}`}
      >
        {title}
      </h2>
    </>
  );
}

export default TitleText;

export const TitleBtn = ({ title, style }: TitleTextProps) => {
  return (
    <StyledWrapper>
      <button className={`neu-button ${style}`}>{title}</button>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .neu-button {
    background-color: #e0e0e0;
    border-radius: 50px;
    box-shadow: inset 4px 4px 10px #bcbcbc, inset -4px -4px 10px #ffffff;
    color: #4d4d4d;
    cursor: pointer;
    font-size: 18px;
    padding: 15px 40px;
    transition: all 0.2s ease-in-out;
    border: 2px solid rgb(206, 206, 206);
  }

  .neu-button:hover {
    box-shadow: inset 2px 2px 5px #bcbcbc, inset -2px -2px 5px #ffffff, 2px 2px 5px #bcbcbc,
      -2px -2px 5px #ffffff;
  }

  .neu-button:focus {
    outline: none;
    box-shadow: inset 2px 2px 5px #bcbcbc, inset -2px -2px 5px #ffffff, 2px 2px 5px #bcbcbc,
      -2px -2px 5px #ffffff;
  }
`;
