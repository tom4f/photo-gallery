import { imgFolder } from '../../api/read'
import styled, { css } from 'styled-components'
import { photoType, imgPositionType } from '../../TypeDefinition';

interface StyledDivTypes {
    imgPosition       : imgPositionType;
    arrIndexFromImgId : (clickedId:number) => number;
    img               : photoType;
}

export const StyledDiv = styled.div< StyledDivTypes >`
    ${ ({imgPosition, arrIndexFromImgId, img}) => css`
        color           : 'white';
        opacity         : ${ arrIndexFromImgId(+img.id) === imgPosition.current ? 0.5 : 1};
        background-image: url(${imgFolder}/${img.id}.jpg?${ imgPosition.reload }) }};
    `}
`