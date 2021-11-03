import styled from 'styled-components'

const ListWrap = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  max-height: 300px;
  overflow: auto;
  &::-webkit-scrollbar {
    display: none;
  }
`

export {
  ListWrap
}