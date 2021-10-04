import './SmallImages.css'
import { SmallImagesTypes } from '../../TypeDefinition';
import { StyledDiv } from './StyledDiv.styled'

export const SmallImages = ( { eightPhoto, arrIndexFromImgId, imgPosition, setImgPosition }: SmallImagesTypes ) => {

    return (
        <header className="imgs">
            { eightPhoto?.map( (img) => (
                <StyledDiv
                    key = {img.id}
                    img = {img}
                    arrIndexFromImgId = {arrIndexFromImgId}
                    imgPosition = {imgPosition} 
                    onClick={ () => setImgPosition( old => ({...old, current: arrIndexFromImgId( +img.id ) }) )  }
                />
            ))} 
        </header>
    )
}