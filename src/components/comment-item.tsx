import { FlatList,Text } from 'react-native';

interface CommentItem {
    id:string
    teacher_name:string
    student_id:string
    student_name: string
    course_id:string
    reply_student:string
    content:string
}

interface Props {
  data: CommentItem[];
  renderCommentItem: ({ item }: {
    item: CommentItem;
}) => JSX.Element
}

const MyCommentList = ({ data, renderCommentItem}: Props) => {

  return (
    <FlatList
      data={data}
      renderItem={renderCommentItem}
      keyExtractor={(item) => item.id}
      scrollEnabled={true}
      contentContainerStyle={{ paddingBottom: 300 }}
    />
  );
};

export default MyCommentList
