import { useEffect, useState } from 'react';
import './css/App.css';
import { loadPicturesfromMySQL } from './api/read'
import { SmallImages } from './SmallImages'
import { BigImage } from './BigImage'

export default function App() {

  const [ allPhoto, setAllPhoto ] = useState([])
  const [ imgPosition, setImgPosition ] = useState({
      smallImgStart: 0,
      smallImgsSize: 8,
      current: 0,
      category: 99999
  })

  useEffect( () => { ( async() => setAllPhoto( await loadPicturesfromMySQL() ) )() }, [])

  const arrIndexFromImgId = (clickedImgId:number):number => filteredPhoto.findIndex( img => +img['id'] === clickedImgId )

  const filteredPhoto = imgPosition.category === 99999
                      ? allPhoto
                      : allPhoto.filter( one => +one['typ'] === imgPosition.category )

  const eightPhoto = () => {
  //   if ( imgPosition.current >= 0 && imgPosition.current < filteredPhoto.length)  {
  //     setImgPosition( (old) => {
  //         const newSmallImgStart =  imgPosition.current - imgPosition.current % imgPosition.smallImgsSize
  //         return ({ ...old, smallImgStart: newSmallImgStart })
  //     })
  // }
    return filteredPhoto.slice(imgPosition.smallImgStart, imgPosition.smallImgStart + imgPosition.smallImgsSize)
  }
  
  const categoryObj = () => {
    const reducer = (sumPerCat: {[key: number]: number}, oneEntry: {[key: string]: number}) => {
      sumPerCat[oneEntry.typ] = (oneEntry.typ in sumPerCat)
                              ? sumPerCat[oneEntry.typ] + 1
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
                   eightPhoto={ eightPhoto() } arrIndexFromImgId={arrIndexFromImgId} />

      <BigImage imgPosition={imgPosition} setImgPosition={setImgPosition}
                bigPhoto={ filteredPhoto[imgPosition.current] }
                categoryObj={categoryObj} length={filteredPhoto.length}  />
    </div>
  )
}