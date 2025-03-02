import { Search as SearchIcon } from '@mui/icons-material';
import { InputBase, Box, styled } from '@mui/material';

const Component = styled(Box)`
    background: #fff;
    height: 45px;
    border-bottom: 1px solid #F2F2F2;
    display: flex;
    align-items: center;
    padding: 12px 12px;
`;
const Wrapper = styled(Box)`
    background-color: #f0f2f5;
    position: relative;
    margin: 0 13px;
    width: 100%;
    border-radius: 10px;
`;
const Icon = styled(Box)`
    position: absolute;
    top: 50%;
    left: 10px;
    transform: translateY(-50%);
    color: #919191;
    display: flex;
    align-items: center;
`;
const InputField = styled(InputBase)`
    width: 100%;
    padding: 12px 12px 12px 40px;
    font-size: 14px;
`;

const Search = ({setText}) => {
    return (
        <Component>
            <Wrapper>
                <Icon>
                    <SearchIcon fontSize='small'/>
                </Icon>
                <InputField placeholder='Search or start new chat'
                onChange={(e) => setText(e.target.value)}/>
            </Wrapper>
        </Component>
    )
}

export default Search;
