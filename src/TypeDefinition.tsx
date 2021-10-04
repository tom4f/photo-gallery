import { ChangeEvent, Dispatch, SetStateAction } from "react";

export type photoType = {
    id: string;
    text: string;
    autor: string;
    email: string;
    typ: string;
    header:string;
    insertDate: string;
    date: string;
    rotate: string;
    url?: string | ArrayBuffer | null;
}

export type allPhotoType = {
    id: string;
    text: string;
    autor: string;
    email: string;
    typ: string;
    header:string;
    insertDate: string;
    date: string;
    rotate: string;
}

export type imgPositionType = {
    smallImgStart: number;
    smallImgsSize: number;
    current: number;
    category: number;
    reload: number;
}

export type setStateType = React.Dispatch<React.SetStateAction<imgPositionType>>

export type categoryObjType = { [key: string]: number };

export type changeType = ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement> | ChangeEvent<HTMLSelectElement>

export type SmallImagesTypes = {
    eightPhoto        : Array<photoType>;
    imgPosition       : imgPositionType;
    setImgPosition    : setStateType;
    arrIndexFromImgId : (clickedId:number) => number;
}

type changeTypeFunction  = ( e:changeType ) => void



export type formularType = {
    editPhoto:photoType,
    change:changeTypeFunction,
    editLogic:(event:React.MouseEvent<HTMLInputElement>, formCurrent: HTMLFormElement | null) => void,
    setEditPhoto: Dispatch<SetStateAction<photoType>>
}

export type editImage = {
    editPhoto: photoType,
    setEditPhoto:Dispatch<SetStateAction<photoType>>,
    setImgPosition : setStateType
}

export type BigImageType = {
    imgPosition    : imgPositionType;
    setImgPosition : setStateType;
    bigPhoto       : photoType;
    categoryObj    : categoryObjType;
    length         : number;
    setAllPhoto    : React.Dispatch<React.SetStateAction<photoType[]>>
}

export type LoginType = {
    (event: React.FormEvent<HTMLFormElement>, formCurrent: HTMLFormElement | null): Promise<void>
}