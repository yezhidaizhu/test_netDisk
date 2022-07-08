/**
 * @ Create Time: 2022-07-07 17:26:24
 * @ Modified time: 2022-07-07 17:41:37
 * @ Description:  最上面的题目
 */

export default function Title(props: { title: string }) {
  const { title } = props;
  return (
    <div className="py-4 pt-6">
      <span className=" text-xl font-bold ">{title}</span>
    </div>
  );
}
