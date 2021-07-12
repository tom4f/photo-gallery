import { setStateType, categoryObjType } from './TypeDefinition';

interface eightPhotoTypes {
    setImgPosition  : setStateType;
    setShowCategory : React.Dispatch<React.SetStateAction<boolean>>;
    categoryObj     : categoryObjType;
}

export const CategoryList = ( { setImgPosition, setShowCategory, categoryObj }: eightPhotoTypes ) => {

    const categoryName:{ [key: number]: string } = { 
        0  : 'aaa',
        1  : 'bbb',
        2  : 'ccc',
        3  : 'ddd',
        4  : 'Web Development',
        99999 : 'Všechny'
    }

    const category = []
    const count = []
    for (const [key, value] of Object.entries( categoryObj ) ) {
        category.push(<p className="oneCategory" key={key} onClick={ () => setImgPosition( prev => ({ ...prev, category: +key, current: 0 }) ) }>{categoryName[+key]}</p>)
        count.push(   <p className="oneCategory" key={key} onClick={ () => setImgPosition( prev => ({ ...prev, category: +key, current: 0 }) ) }>{value}</p>)
    }

    return (
        <section className="categoryList" onMouseLeave={ () => setShowCategory(false)} >
            <fieldset>
                <legend>Kategorie / počet fotek</legend>
                <section>    
                    <header>
                        {category}
                    </header>
                    <article>
                        {count}
                    </article>
                </section>
            </fieldset>
        </section>
    )
}