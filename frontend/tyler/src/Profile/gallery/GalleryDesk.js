import React, {useState} from "react";
import Menu from "../../util/menu/Menu";
import image0 from '../../galleryPics/animayGuySeleve.jpg';
import image1 from '../../galleryPics/blackKnightSleve.jpg';
import image2 from '../../galleryPics/bluePinkGirlUpperArm.jpg';
import image3 from '../../galleryPics/blueWakeUpSleve.jpg';
import image4 from '../../galleryPics/buddaSleve.jpg';
import image5 from '../../galleryPics/clownBW.jpg';
import image6 from '../../galleryPics/clownColorSleve.jpg';
import image7 from '../../galleryPics/CyborgSleve.jpg';
import image8 from '../../galleryPics/DragonChest.jpg';
import image9 from '../../galleryPics/guyScreamingSleve.jpg';
import image10 from '../../galleryPics/JesusChest.jpg';
import image11 from '../../galleryPics/pinkGirlSleve.jpg';
import image12 from '../../galleryPics/redArmSleve.jpg';
import image13 from '../../galleryPics/redheadSleve.png';
import image14 from '../../galleryPics/redLeafsSleveBW.jpg';
import image15 from '../../galleryPics/spaceGalaxySleve.jpg';
import image16 from '../../galleryPics/thorUpperArm.jpg';
import image17 from '../../galleryPics/twoFaceSleve.jpg';


function GalleryDesk(){

    const images = [
        image0,
        image1,
        image2,
        image3,
        image4,
        image5,
        image6,
        image7,
        image8,
        image9,
        image10,
        image11,
        image12,
        image13,
        image14,
        image15,
        image16,
        image17
      ];

      const [showGal,setShowGal] = useState(true);
      const [selectImage,setSelectedImage] = useState(undefined);

      function handleClick(image){


      }

      const DisplayOneImage = (props)=>{

        return(<div>
            <Menu />
            <div className="page">
                <div className="gallery">
                    <div className="frame">
                    <div 

                    onClick={()=>setSelectedImage(undefined)}
                    style={{textAlign:'left',fontSize:'100px'}}
                    
                    >X</div>
                    <img 
                    width={'1400px'}
                    src={props.image}></img>

                    </div>
                </div>
            </div>
        </div>);
      }

    if(selectImage!==undefined) return <DisplayOneImage image={selectImage} />;
    else
    return (
        <div>
            <Menu />
            <div className="page" >
                <div className="gallery">
                <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
                        
                        <div
                            style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                            gap: '20px',
                            }}
                        >
                            {images.map((src, index) => (
                            <img
                                key={index}
                                src={src}
                                onClick={()=>setSelectedImage(src)}
                                alt={`Gallery image ${index + 1}`}
                                style={{
                                width: '100%',
                                height: 'auto',
                                borderRadius: '8px',
                                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                                }}
                                loading="lazy" // Improves performance for multiple images
                            />
                            ))}
                        </div>
                        </div>
                </div>
            </div>
        </div>
    )
}

export default GalleryDesk;
