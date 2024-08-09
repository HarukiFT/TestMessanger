import { Avatar, Button, Container, Drawer, IconButton, List, ListItem, ListItemButton, ListItemText, Paper, Stack, Typography, styled } from "@mui/material"
import React from "react"
import { Link } from "react-router-dom"

const MenuLink = styled(Link)(({ theme }) => ({
    textDecoration: 'none',
    fontSize: theme.typography.h6.fontSize,
    color: theme.palette.text.primary,
    padding: `.25em .5em`,

    transition: 'all .15s',

    '&:hover': {
        backgroundColor: '#0000000D'
    }
}))

const Topper: React.FC<{ height: number }> = ({ height }) => {
    return (
        <Drawer variant="persistent" open anchor="top">
            <Paper sx={{ height: `${height}px` }}>
                <Container maxWidth={"xl"} sx={{display: 'flex', alignItems: 'center', height: 1}}>
                    <Stack direction={'row'} width={1} alignItems={'center'}>
                        <List sx={{display: 'flex', justifyContent: 'start', flexGrow: 1}}>
                            <ListItem sx={{width: 'min-content'}}>
                                <MenuLink to={'/friends'}>
                                    Друзья
                                </MenuLink>
                            </ListItem>

                            <ListItem sx={{width: 'min-content'}}>
                                <MenuLink to={'/messages'}>
                                    Сообщения
                                </MenuLink>
                            </ListItem>
                        </List>

                        <IconButton>
                            <Avatar sx={(theme) => ({backgroundColor: theme.palette.primary.main})}>
                            </Avatar>
                        </IconButton>
                    </Stack>
                </Container>
            </Paper>
        </Drawer>
    )
}

export default Topper