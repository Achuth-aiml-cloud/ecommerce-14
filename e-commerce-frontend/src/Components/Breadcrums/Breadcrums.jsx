import React from 'react';
import './Breadcrums.css';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';

const Breadcrums = (props) => {
  const { product } = props;
  const storage = getStorage();

  const fetchImage = async () => {
    try {
      // Get download URL for the arrow icon image from Firebase Storage
      const arrowIconRef = ref(storage, 'breadcrum_arrow.png');
      const arrowIconUrl = await getDownloadURL(arrowIconRef);
      return arrowIconUrl;
    } catch (error) {
      console.error('Error fetching image:', error);
    }
  };

  const renderBreadcrumArrows = () => {
    const arrows = [];
    for (let i = 0; i < 3; i++) {
      arrows.push(<img key={i} src={fetchImage()} alt="" />);
    }
    return arrows;
  };

  return (
    <div className='breadcrums'>
      HOME {renderBreadcrumArrows()} SHOP {renderBreadcrumArrows()} {product.category} {renderBreadcrumArrows()} {product.name}
    </div>
  );
};

export default Breadcrums;
