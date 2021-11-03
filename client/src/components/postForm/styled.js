import styled from 'styled-components'

const PostFormWrap = styled.form`
    width: 100%;
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    position: relative;
    input {
        width: 100%;
        border: 1px solid #ccc;
        padding: 10px;
        border-radius: 5px;
        font-size: 14px;
        font-weight: normal;
        line-height: 18px;
        outline: none;
    }
    button {
        display: flex;
        align-items: center;
        position: absolute;
        right: 0;
        padding: 10px;
        font-size: 14px;
        font-weight: normal;
        line-height: 18px;
        text-transform: uppercase;
        background-color: tomato;
        color: #fff;
        min-height: 39px;
        cursor: pointer;
        border: 1px solid #ccc;
        border-top-right-radius: 4px;
        border-bottom-right-radius: 4px;
    }
`

export {
    PostFormWrap
}