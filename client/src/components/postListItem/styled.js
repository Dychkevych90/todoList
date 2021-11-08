import styled from 'styled-components'

const ListItemWrap = styled.div`
  display: flex;
  margin-bottom: 10px;
  justify-content: space-between;
  border-radius: 4px;
  min-height: 40px;
  align-items: center;
  transition: .3s;
  cursor: pointer;
  border: 1px solid transparent;
  position: relative;

  .title {
    font-size: 16px;
    line-height: 25px;
    font-weight: 400;
    flex: 2;
    text-align: left;
    word-break: break-all;
    padding-right: 80px;
    text-transform: ${props => props.doneStyle ? 'lowercase' : 'uppercase'};
    color: ${props => props.doneStyle ? 'gray' : '#000'};
    text-decoration: ${props => props.doneStyle ? 'line-through' : 'none'}
  }

  button {
    width: 20px;
    height: 20px;
    background: transparent;
    border: none;
    margin-right: 10px;

    svg {
      display: block;
      cursor: pointer;
      width: 15px!important;
      height: 15px!important;

      path {
        fill: #333;
        transition: .3s;
      }
    }
  }

  & button:last-child {
    margin-right: 0;
  }

  .btn_delete:hover {
    svg path {
      fill: red;
    }
  }

  .btn_done {
    svg path {
      fill: ${props => props.doneStyle ? '#54E018FF' : '#333'};
    }

    &:hover {
      svg path {
        fill: #54E018FF;
      }
    }
  }
`

export {
  ListItemWrap
}