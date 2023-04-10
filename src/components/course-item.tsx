import { FlatList,Text } from 'react-native';

interface CourseItem {
  id:string
  name: string
  course_id:string
  class_name: string 
  kind: string 
  classes:string
  language: string
  score:string
  credit:string
  period:string 
  teacher:string,
  time:string
  capacity:string 
  star:string
  college:string
}

interface Props {
  data: CourseItem[];
  renderItem: ({ item }: {
    item: CourseItem;
}) => JSX.Element
}

const MyCourseList = ({ data, renderItem}: Props) => {

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      contentContainerStyle={{ flexGrow: 1 }} 
      scrollEnabled={true}
    />
  );
};

export default MyCourseList