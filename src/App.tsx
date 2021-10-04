import { useEffect, useState } from 'react';
import './css/App.css';
import { loadPicturesfromMySQL } from './api/read'
import { SmallImages } from './components/SmallImages'
import { BigImage } from './components/BigImage'
import { allPhotoType, categoryObjType } from './TypeDefinition';

export default function App() {
  const [ allPhoto, setAllPhoto ]       = useState<allPhotoType[]>([])
  const [ imgPosition, setImgPosition ] = useState({ smallImgStart: 0, smallImgsSize: 8, current: 0, category: 99999, reload: 0 })

  useEffect( () => { ( async() => setAllPhoto( await loadPicturesfromMySQL() ) )() }, [imgPosition.reload])

  const arrIndexFromImgId = (clickedImgId:number):number => filteredPhoto.findIndex( img => +img['id'] === clickedImgId )

  const filteredPhoto = imgPosition.category === 99999 
                      ? allPhoto
                      : allPhoto.filter( one => +one['typ'] === imgPosition.category )

  const eightPhoto = filteredPhoto.slice(imgPosition.smallImgStart, imgPosition.smallImgStart + imgPosition.smallImgsSize)
  
  const categoryObj = () => {
    const reducer = (sumPerCat: categoryObjType, oneEntry: {[key: string]: string}) => {
       
      if ( !oneEntry.typ ) return sumPerCat

      sumPerCat[oneEntry.typ] = (oneEntry.typ in sumPerCat)
                              ? sumPerCat[+oneEntry.typ] + 1
                              : 1
      return sumPerCat
    }
    return { 
        ...allPhoto.reduce(reducer, {}),
        99999 : allPhoto.length
    }
  }

  return (
    <div className="container">
      <SmallImages imgPosition={imgPosition} setImgPosition={setImgPosition} 
                   eightPhoto={ eightPhoto } arrIndexFromImgId={arrIndexFromImgId} />
      <BigImage imgPosition={imgPosition} setImgPosition={setImgPosition}
                bigPhoto={ filteredPhoto[imgPosition.current] }
                categoryObj={categoryObj()} length={filteredPhoto.length}
                setAllPhoto={setAllPhoto}  />
    </div>
  )
}