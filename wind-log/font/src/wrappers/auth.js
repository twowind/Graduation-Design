import { Redirect, connect } from 'umi'

const index = (props) => {
  let auth = true

  try {
    let user = window.localStorage.getItem('token')
    if (user === null) auth = false
  } catch {
    auth = false
  }
  if (auth) {
    return (<>{props.children}</>);
  } else {
    return <Redirect to="/" />;
  }
}

export default index