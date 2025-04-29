import React, { useState } from "react";
import { Modal } from "antd";

const ModalPage = ({ icon, children }) => {
  const [openResponsive, setOpenResponsive] = useState(false);

  return (
    <>
 
      <div onClick={() => setOpenResponsive(true)} className="cursor-pointer">
        {icon}
      </div>


      <Modal
        centered
        open={openResponsive}
        onCancel={() => setOpenResponsive(false)}
        footer={null}  
        closable={false}
        width={600}   
      >
        {children}
      </Modal>
    </>
  );
};

export default ModalPage;
