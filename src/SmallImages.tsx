import { imgFolder } from './api/read'
import './css/SmallImages.css'

type photoType = { id: string; text: string; autor: string; email: string; }
type imgPositionType = { smallImgStart: number; smallImgsSize: number; current: number; category: number; }

interface SmallImagesTypes {
    eightPhoto        : null | Array<photoType>;
    arrIndexFromImgId : (clickedId:number) => number;
    imgPosition       : imgPositionType;
    setImgPosition    : React.Dispatch<React.SetStateAction<imgPositionType>>;
}

export const SmallImages = ( { eightPhoto, arrIndexFromImgId, imgPosition, setImgPosition }: SmallImagesTypes ) => {

    const eightImgsDiv = () => {
        if ( !eightPhoto ) return;

        return eightPhoto.map( (img) => (
                    <div key={img.id}
                         style={{
                            color: 'white',
                            opacity: `${ arrIndexFromImgId(+img.id) === imgPosition.current ? 0.5 : 1}`,
                            backgroundImage: `url(${imgFolder}/${img.id}.jpg)` }}
                         onClick = { () => setImgPosition( old => ({ ...old, current: arrIndexFromImgId( +img.id ) }) )  }>
                        {img.id}
                    </div> ))
    }

    return (
        <header className="imgs">
            { eightImgsDiv() }
        </header>
    )
}