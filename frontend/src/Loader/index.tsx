
import ContentLoader from "react-content-loader"

const MyLoader = () => (
  <ContentLoader 
    speed={2}
    width={290}
    height={373}
    viewBox="0 0 290 373"
    backgroundColor="rgba(136, 136, 136, 0.3)"
    foregroundColor="#888"
  >
     <rect x="0" y="0" rx="11" ry="11" width="290" height="25" />
    {/* <rect x="210" y="11" rx="7" ry="7" width="80" height="26" />  */}
    <rect x="0" y="37" rx="9" ry="9" width="290" height="255" /> 
    <rect x="25" y="305" rx="9" ry="9" width="240" height="16" /> 
    <rect x="0" y="326" rx="11" ry="11" width="290" height="45" />
  </ContentLoader>
)


export default MyLoader