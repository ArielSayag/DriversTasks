import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import { useAppContext } from '../context/AppContext';
import { Driver } from '../types';

const App: React.FC<{ driver: Driver }>  = ({driver}) => {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const appContext = useAppContext();


  const handleOk = () => {
    setIsModalOpen(false);
    appContext.removeDriver(driver.id);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Modal title="Delete Driver" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <p>Are you shore delete {driver.name}?</p>
      </Modal>
    </>
  );
};

export default App;