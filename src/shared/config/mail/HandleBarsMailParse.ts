import handlebars from "handlebars"

// variaveis dinamicas

interface ITemplateVariables {
  [key: string]: string | number
}
interface IMailTemplateParse {
  template: string
  variables: ITemplateVariables
}

export class HandleBarsMailParse {
  public async parse({
    template,
    variables,
  }: IMailTemplateParse): Promise<string> {
    const parseTemplate = handlebars.compile(template)
    return parseTemplate(variables)
  }
}
