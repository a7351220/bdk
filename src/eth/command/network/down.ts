import { Arguments } from 'yargs'
import config from '../../config'
import Network from '../../service/network'
import { logger, onCancel } from '../../../util'
import prompts from 'prompts'
import ora from 'ora'
import { getNetworkTypeChoices } from '../../config/network.type'

export const command = 'down'

export const desc = '停止現有的 Eth Network'

export const builder = {}

export const handler = async (argv: Arguments) => {
  logger.debug('exec network down', argv.$0)

  const { networkType } = await prompts([
    {
      type: 'select',
      name: 'networkType',
      message: 'What is your network?',
      choices: getNetworkTypeChoices(),
    },
  ])
  const networkTypeWithBigFirstLetter = networkType.charAt(0).toUpperCase() + networkType.slice(1)
  const network = new Network(config, networkType)

  let confirmDelete = true

  const response = await prompts({
    type: 'confirm',
    name: 'value',
    message: `Confirm to down ${networkTypeWithBigFirstLetter} Network?`,
    initial: false,
  }, { onCancel })

  confirmDelete = response.value

  if (confirmDelete) {
    const spinner = ora(`${networkTypeWithBigFirstLetter} Network Down ...`).start()
    await network.down()
    spinner.succeed(`${networkTypeWithBigFirstLetter} Network Down Successfully!`)
  }
}
