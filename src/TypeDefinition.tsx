import { ChangeEvent, Dispatch, SetStateAction } from "react";

export interface allPhotoType {
    id         : string;
    text       : string;
    autor      : string;
    email      : string;
    typ        : string;
    header     : string;
    insertDate : string;
    date       : string;
    rotate     : string;
    imgType    : string;
}

export interface photoType extends allPhotoType {
    url?: string | ArrayBuffer | null;
}

export type imgPositionType = {
    smallImgStart : number;
    smallImgsSize : number;
    current       : number;
    category      : number;
    reload        : number;
}

export type setStateType = React.Dispatch<React.SetStateAction<imgPositionType>>

export type categoryObjType = { [key: string]: number };

export type categoryNameType = { [key: string]: string };

export type changeType = ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement> | ChangeEvent<HTMLSelectElement>

export type categoryChangeType = ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement> | ChangeEvent<HTMLSelectElement>


export type SmallImagesTypes = {
    eightPhoto        : Array<allPhotoType>;
    imgPosition       : imgPositionType;
    setImgPosition    : setStateType;
    arrIndexFromImgId : (clickedId:number) => number;
}

export type AlertType = {
    header : string;
    text   : string;
    color? : string;
}

type setImgPositionType = React.Dispatch<React.SetStateAction<{
    smallImgStart: number;
    smallImgsSize: number;
    current: number;
    category: number;
    reload: number;
}>>

export type editLogicType = (
    event          : React.MouseEvent<HTMLInputElement>,
    formCurrent    : HTMLFormElement | null,
    setAlert       : React.Dispatch<React.SetStateAction<AlertType>>,
    loginData      : any,
    setImgPosition : setImgPositionType
) => Promise<void>

export type formularType = {
    editPhoto        : photoType;
    setEditPhoto     : Dispatch<SetStateAction<photoType>>;
    setImgPosition   : setStateType;
    categoryObj      : categoryObjType;
    loginData        : any;
}

export type editCategoryLogicType = ( 
    event       : React.MouseEvent<HTMLInputElement>,
    categoryName: categoryNameType | null, 
    setAlert    : React.Dispatch<React.SetStateAction<AlertType>>
) => Promise<void>

export type addCategoryLogicType = ( 
    event          : React.MouseEvent<HTMLInputElement>,
    setCategoryName: React.Dispatch<React.SetStateAction<categoryNameType | null>>
) => Promise<void>

export type EditCategoryType = {
    categoryObj     : categoryObjType;
    setImgPosition  : setStateType;
    editCategory    : (event: React.MouseEvent<HTMLInputElement>) => void;
    setCategoryName : React.Dispatch<React.SetStateAction<categoryNameType | null>>
    categoryName    : { [key: string]: string } | null;
}

export type editImage = {
    editPhoto      : photoType;
    setEditPhoto   : Dispatch<SetStateAction<photoType>>;
    setImgPosition : setStateType;
    categoryObj    : categoryObjType;
}

export type imageChangeType = {
    setEditPhoto: React.Dispatch<React.SetStateAction<photoType>>
}

export type BigImageType = {
    imgPosition    : imgPositionType;
    setImgPosition : setStateType;
    bigPhoto       : photoType;
    categoryObj    : categoryObjType;
    length         : number;
    setAllPhoto    : React.Dispatch<React.SetStateAction<photoType[]>>
}

export type loginLogicType = (
    event: React.FormEvent<HTMLFormElement>,
    formCurrent: HTMLFormElement | null,
    setAlert    : React.Dispatch<React.SetStateAction<AlertType>>,
    setLoginData: any
) => Promise<void>

export type LoginType = {
    setLoginData: React.Dispatch<React.SetStateAction<{
        isLogged: boolean;
        webToken: string;
        webAccess: string;
        webUser: string;
    }>>
}