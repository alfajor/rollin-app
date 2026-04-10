import styled from "styled-components";

const NavMenu = () => {
    return (
        <>
        <NavMenuContainer>
            <PrimaryMenu>
                {/* TODO: logo */}
                <li><a href="#">about</a></li>
            </PrimaryMenu>          
        </NavMenuContainer>
        </>
    )
}

const NavMenuContainer = styled.div`
  display: flex;  
`;

const PrimaryMenu = styled.ul`
    display: flex;
    flex-flow: row;  
    align-items: center;
    width: 100%;
    justify-content: center;

    li {
        list-style: none;
    }

    a {
        padding-left: 20px;
    }
`;

export default NavMenu;