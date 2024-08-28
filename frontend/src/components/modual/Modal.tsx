import styled from "styled-components";
export default function Modal({children,setModal} : { children: React.ReactNode, setModal: (value: boolean) => void }) {
    return (
        <>
            <Overlay />
            <ModalBox>
                <CloseButton onClick={() => setModal(false)}>❌</CloseButton>
                {children}
            </ModalBox>
        </>
    );
}

const ModalBox = styled.div`
  background: #fff;
  padding: 20px;
  border-radius: 15px;
  position: fixed;
  top: 16%;
  left: 10%;
  box-shadow: var(--box-shadow-default);
  z-index: 1000;
  width: 80%;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.7);
  z-index: 1000;
  display: flex;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1%;
  right: 1%;
  background: none;
  border: none;
`;
