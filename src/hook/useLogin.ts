

const useLogin = () => {
    const { isLoading, data, mutateAsync, error } = useMutation({
        mutationFn: (variables: Variables) =>
            rootApi.post<Variables, Response>(endpoints.cancel_job, variables),
    })


    return {
        isLoading,
        data,
        mutateAsync,
        error
    }
}

export default useLogin