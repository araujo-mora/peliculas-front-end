export function toBase64(file: File){
    return new Promise<string|ArrayBuffer|null>((resolve, reject)=>{
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error)=> reject(error);
    })
}

export function parseHttpError(response: any): string[]{
    const result: string[] = [];

    if(response.error){
        if(typeof response.error === 'string'){
            result.push(response.error);
        }else{
            const errorMap = response.error.errors;
            const entries = Object.entries(errorMap);
            entries.forEach((arr: any[]) => {
                const field = arr[0];
                arr[1].forEach((errorMessage: any) => {
                    result.push(errorMessage); //`${field}: ${errorMessage}`
                });
            });
        }
    }

    return result;
}

export function dateFormatter(date: Date){
    date = new Date(date);
    const format = new Intl.DateTimeFormat('en',{
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    });

    const [
        {value: month},,
        {value: day},,
        {value: year}
    ] = format.formatToParts(date);

    return `${year}-${month}-${day}`;
}