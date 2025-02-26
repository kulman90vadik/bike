
import ContentLoader from "react-content-loader"

const LoaderLine = () => (
  <ContentLoader 
    speed={2}
    width={180}
    height={18}
    viewBox="0 0 180 18"
    backgroundColor="#eeddd2"
    foregroundColor="#f5c4a3"
  >
    <rect x="0" y="0" rx="3" ry="3" width="180" height="17" />
  </ContentLoader>
)

export default LoaderLine;