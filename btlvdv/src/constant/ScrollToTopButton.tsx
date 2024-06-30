import React, { useState, useEffect } from 'react';
import { Button   } from 'antd';
import {UpOutlined} from "@ant-design/icons";
const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  return (
    <div>
      {isVisible && (
        <Button type="primary" shape="circle" size="large" onClick={scrollToTop} style={{ position: 'fixed', bottom: '30px', right: '30px',zIndex:'4',backgroundColor:'black' }}>
          <UpOutlined />
        </Button>
      )}
    </div>
  );
};

export default ScrollToTopButton;
