import * as React from 'react';

// type 정의
interface Props {
    name: string;
    job: string;
}

// 함수형 컴포넌트
// SFC : type을 명시적으로 지정해줌
// SFC를 사용하지 않으면 컴포넌트가 JSX가 아닌 문자열을 반환하는 오류가 발생할 때, Profile이 아닌 앱에서 발생한다
const Profile : React.SFC<Props> = ({name, job}: Props) => (
    <div>
        <h1>프로필</h1>
        <div>
            <b>이름: </b>
            {name}
        </div>
        <div>
            <b>직업: </b>
            {job}
        </div>
    </div>
);

// 클래스 컴포넌트
// class Profile extends React.Component<Props> {
//     render() {
//         const { name, job } = this.props;
//         return (
//             <div>
//                 <h1>프로필</h1>
//                 <div>
//                     <b>이름: </b>
//                     {name}
//                 </div>
//                 <div>
//                     <b>직업: </b>
//                     {job}
//                 </div>
//             </div>
//         );
//     }
// }

export default Profile;