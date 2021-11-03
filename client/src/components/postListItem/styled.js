import styled from 'styled-components'

const ListItemWrap = styled.div`
  width: 100%;
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
    text-transform: uppercase;
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
      path {
        fill: #333;
      }
    }
  }
  & button:last-child{
    margin-right: 0;
  }
`

export {
  ListItemWrap
}