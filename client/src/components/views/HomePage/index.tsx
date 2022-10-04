import { RecentEventsFeed } from './RecentEventsFeed/index';
import { SelectMatchContainer } from './SelectMatchContainer/index';
declare module './styles.module.css';

export function HomePage () {

  return (
    <div className="home-page-container">
      <SelectMatchContainer />
      <RecentEventsFeed />
    </div>
  )
}