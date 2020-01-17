export default interface Component {
  targetDay?: number;  // type이 number이거나 null이어도 된다
  targetMonth : string;
  title?: string;
  showMonth?: boolean; // 보여줘야 하는 달만 true
  handleState?: (data: object) => void;
  onClickDay?: (day: number, dayData: any) => void;
  dayComponent?: object;
  data?: DataObj[];
  width?: string;
  containerClassName?: string;
  rowContainerClassName? : string;
  dayContainerClassName? : string;
  dayDataListClass?: string;
  dayDataListItemClass?: string;
  daysHeaderContainerClass?: string;
  daysTitleContainerClass?: string;
  titleContainerClass?: string;
  monthTitleClass?: string;
  colorPastDates?: string;
  colorActiveDate?: string;
}

export interface DataObj {
  day: number,
  title: string,
  component?: object
}