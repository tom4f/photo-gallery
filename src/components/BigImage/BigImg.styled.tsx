import { imgFolder } from '../../api/read'
import styled, { css } from 'styled-components'
import { imgPositionType, allPhotoType, photoType } from '../../TypeDefinition'

type IBigImg =  {
    editPhoto  : photoType;
    bigPhoto   : allPhotoType;
    fadeIn     : boolean;
    imgPosition: imgPositionType;
}

export const BigImg = styled.main< IBigImg >`
 
${ ({bigPhoto, editPhoto, fadeIn, imgPosition}) => ( bigPhoto && !editPhoto) && css`
    & { 
        background-image: url(${ `${imgFolder}/${bigPhoto?.id}b.${bigPhoto?.imgType}?${imgPosition.reload}` });
        ${ fadeIn && css`
            opacity: 0;
            animation: fadeIn 0.5s ease-in 1 forwards;
        `}
    `}
}

${ ({bigPhoto, editPhoto, fadeIn, imgPosition}) => editPhoto && css`
    &::after {
        background-image: url(${ (editPhoto?.url as string ) || `${imgFolder}/${bigPhoto?.id}b.${bigPhoto?.imgType}?${imgPosition.reload}` });
        background-position: ${ (editPhoto?.rotate ===   '0' && 'top    center') ||
                                (editPhoto?.rotate ===  '90' && 'center center') ||
                                (editPhoto?.rotate === '180' && 'bottom center') ||
                                (editPhoto?.rotate === '270' && 'center center')
                             };
        transform: rotate(${-editPhoto?.rotate}deg);
        ${ fadeIn && css`
            opacity: 0;
            animation: fadeIn 0.5s ease-in 1 forwards;
        `}
    }`
}
`