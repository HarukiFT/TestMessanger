import { Box, Button, Paper, Stack, TextField, Typography } from "@mui/material"
import { FormEvent, useState } from "react"
import { toast } from "react-toastify"
import axiosRequest from "../../shared/services/axiosInstance"
import { AxiosError } from "axios"

export default() => {
    const [fieldsData, setFieldsData] = useState<Record<string, string>>({})

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()

        if (!fieldsData.username || !fieldsData.password) {
            toast.error('Заполни форму как человек!')
            return
        }

        if (fieldsData.username.length < 3) {
            toast.error('Никнейм побольше сделай')
            return
        }

        if (fieldsData.password.length < 8) {
            toast.error('Ну сделай ты пароль подлинее')
            return
        }

        axiosRequest.post('/users/create', fieldsData).then(() => {
            toast.success('Аккаунт успешно создан')
        }).catch((err: AxiosError) => {
            if (!err.response) { toast.error('Ошибка подключения') }
            else { toast.error('Никнейм уже занят') }
        })
    }

    const handleFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFieldsData({
            ...fieldsData,
            [e.currentTarget.name]: e.currentTarget.value
        })
    }

    return (
        <Stack direction={'row'} width={1} height={1}>
            <Box width={.5} height={1}>
                <Paper sx={{width: 1, height: 1}}>
                    <Stack width={1} height={1} p={5} justifyContent={'center'} alignItems={'center'}>
                        <Typography variant="h3" mb={5}>Регистрация</Typography>
                        <Typography variant="h4">Берешь и жестко регистрируешься!</Typography>
                    </Stack>
                </Paper>
            </Box>

            <Box flexGrow={1} height={1}>
                <Stack height={1} width={1} p={5} alignItems={'center'} justifyContent={'center'}>
                    <Box component={'form'} width={.5} onSubmit={handleSubmit}>
                        <Typography variant="h5">Сюда данные надо вписать</Typography>
                        <TextField onChange={handleFieldChange} label="Никнейм" required name="username" fullWidth margin="normal"/>
                        <TextField onChange={handleFieldChange} label="Пароль" required type='password' name="password" fullWidth margin="normal" sx={{mb: 2}}/>
                        <Button fullWidth color="primary" type="submit" variant="contained">Создать аккаунт</Button>
                    </Box>
                </Stack>
            </Box>
        </Stack>
    )
}