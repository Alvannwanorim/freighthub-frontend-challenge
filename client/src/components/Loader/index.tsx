import styled from 'styled-components'

const Loader = styled.div`
  margin: 20% auto;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: dashed 3px blue;
  animation-name: loader-spin;
  animation-duration: 2s;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
  @keyframes loader-spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`
export default Loader
