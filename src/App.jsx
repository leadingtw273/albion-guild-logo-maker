import { Spin, Tooltip, Space, Card, Flex, Image, Form, Select, Radio, Slider, Input, Button, message } from 'antd';
import { useDebounceCallback, useCopyToClipboard } from 'usehooks-ts'
import { CopyOutlined, RedoOutlined } from '@ant-design/icons';

import './App.css'
import { Divider } from 'antd';
import { useEffect, useState } from 'react';

const colorList = [
  {value: 1, rgb: [0, 0, 0]},
  {value: 2, rgb: [255, 255, 255]},
  {value: 3, rgb: [44, 44, 42]},
  {value: 4, rgb: [205, 191, 158]},
  {value: 5, rgb: [240, 181, 61]},
  {value: 6, rgb: [187, 90, 24]},
  {value: 7, rgb: [66, 41, 18]},
  {value: 8, rgb: [148, 30, 27]},
  {value: 9, rgb: [77, 19, 26]},
  {value: 10, rgb: [107, 44, 81]},
  {value: 11, rgb: [58, 32, 57]},
  {value: 12, rgb: [50, 78, 103]},
  {value: 13, rgb: [67, 98, 45]},
  {value: 14, rgb: [37, 60, 28]},
]

const symbolOptions = [
  { value: 'Scoia\'Tael', label: 'Scoia\'Tael' },
  { value: 'Rocket Beans', label: 'Rocket Beans' },
  { value: 'Envy', label: 'Envy' },
  { value: 'Red Army', label: 'Red Army' },
  { value: 'GUILDSYMBOL_001', label: '01' },
  { value: 'GUILDSYMBOL_002', label: '02' },
  { value: 'GUILDSYMBOL_003', label: '03' },
  { value: 'GUILDSYMBOL_004', label: '04' },
  { value: 'GUILDSYMBOL_005', label: '05' },
  { value: 'GUILDSYMBOL_006', label: '06' },
  { value: 'GUILDSYMBOL_007', label: '07' },
  { value: 'GUILDSYMBOL_008', label: '08' },
  { value: 'GUILDSYMBOL_009', label: '09' },
  { value: 'GUILDSYMBOL_010', label: '10' },
  { value: 'GUILDSYMBOL_011', label: '11' },
  { value: 'GUILDSYMBOL_012', label: '12' },
  { value: 'GUILDSYMBOL_013', label: '13' },
  { value: 'GUILDSYMBOL_014', label: '14' },
  { value: 'GUILDSYMBOL_015', label: '15' },
  { value: 'GUILDSYMBOL_016', label: '16' },
  { value: 'GUILDSYMBOL_017', label: '17' },
  { value: 'GUILDSYMBOL_018', label: '18' },
  { value: 'GUILDSYMBOL_019', label: '19' },
  { value: 'GUILDSYMBOL_020', label: '20' },
  { value: 'GUILDSYMBOL_021', label: '21' },
  { value: 'GUILDSYMBOL_022', label: '22' },
  { value: 'GUILDSYMBOL_023', label: '23' },
  { value: 'GUILDSYMBOL_024', label: '24' },
  { value: 'GUILDSYMBOL_025', label: '25' },
  { value: 'GUILDSYMBOL_026', label: '26' },
  { value: 'GUILDSYMBOL_027', label: '27' },
  { value: 'GUILDSYMBOL_028', label: '28' },
  { value: 'GUILDSYMBOL_029', label: '29' },
  { value: 'GUILDSYMBOL_030', label: '30' },
  { value: 'GUILDSYMBOL_031', label: '31' },
  { value: 'GUILDSYMBOL_032', label: '32' },
  { value: 'GUILDSYMBOL_033', label: '33' },
  { value: 'GUILDSYMBOL_034', label: '34' },
  { value: 'GUILDSYMBOL_035', label: '35' },
  { value: 'GUILDSYMBOL_036', label: '36' },
  { value: 'GUILDSYMBOL_037', label: '37' },
  { value: 'GUILDSYMBOL_038', label: '38' },
  { value: 'GUILDSYMBOL_039', label: '39' },
  { value: 'GUILDSYMBOL_040', label: '40' },
  { value: 'GUILDSYMBOL_041', label: '41' },
  { value: 'GUILDSYMBOL_042', label: '42' },
  { value: 'GUILDSYMBOL_043', label: '43' },
  { value: 'GUILDSYMBOL_044', label: '44' },
  { value: 'GUILDSYMBOL_045', label: '45' },
  { value: 'GUILDSYMBOL_046', label: '46' },
  { value: 'GUILDSYMBOL_047', label: '47' },
  { value: 'GUILDSYMBOL_048', label: '48' },
  { value: 'GUILDSYMBOL_049', label: '49' },
  { value: 'GUILDSYMBOL_050', label: '50' },
  { value: 'GUILDSYMBOL_051', label: '51' },
  { value: 'GUILDSYMBOL_052', label: '52' },
  { value: 'GUILDSYMBOL_053', label: '53' },
  { value: 'GUILDSYMBOL_054', label: '54' },
  { value: 'GUILDSYMBOL_VENDETTA', label: 'Vendetta' },
  { value: 'GUILDSYMBOL_INSANE_EMPIRE', label: 'Insane Empire' },
  { value: 'GUILDSYMBOL_HAMMER_AND_SICKLE', label: 'Hammer and Sickle' },
  { value: 'GUILDSYMBOL_GOON', label: 'Goons' },
  { value: 'GUILDSYMBOL_WAR_LEGEND', label: 'War Legend' },
  { value: 'GUILDSYMBOL_FINSTACK', label: 'Finstack' },
  { value: 'GUILDSYMBOL_GENTLEMEN', label: 'Gentlemen' },
  { value: 'GUILDSYMBOL_HONOR_N_GLORY', label: 'Honor n Glory' },
  { value: 'GUILDSYMBOL_NILFGAARD', label: 'Nilfgaard' },
  { value: 'GUILDSYMBOL_WILDWEST', label: 'Wild West' },
  { value: 'GUILDSYMBOL_CONFLICT', label: 'Conflict' },
  { value: 'GUILDSYMBOL_CZECO', label: 'CzeCo' },
  { value: 'GUILDSYMBOL_FURIA', label: 'Furia' },
  { value: 'GUILDSYMBOL_HELMET', label: 'Mostly Harmless' },
  { value: 'GUILDSYMBOL_INFINITE', label: 'Infinite' },
  { value: 'GUILDSYMBOL_RUSSIAN_BEARS', label: 'Russian Bears' },
  { value: 'GUILDSYMBOL_ZERATOR', label: 'Zerator' },
  { value: 'GUILDSYMBOL_ZORN', label: 'Zorn' },
  { value: 'GUILDSYMBOL_MONEYGUILD', label: 'MoneyGuild' },
  { value: 'GUILDSYMBOL_DEATH', label: 'Death' },
  { value: 'GUILDSYMBOL_EOS', label: 'Echo of Silence' },
  { value: 'GUILDSYMBOL_KOTD', label: 'Knights of the Darkside' },
  { value: 'GUILDSYMBOL_SAY_MY_NAME', label: 'Say My Name' },
  { value: 'GUILDSYMBOL_TRIDRA', label: 'Tridra' },
  { value: 'GUILDSYMBOL_AD_HONORES', label: 'Ad Honores' },
  { value: 'GUILDSYMBOL_BLAM', label: 'BLAM' },
  { value: 'GUILDSYMBOL_WOLF', label: 'Wolf' },
  { value: 'GUILDSYMBOL_HAMMERS', label: 'Hammers' },
]

const schemaOptions = [
  { value: 'SCHEMA_01', label: '01' },
  { value: 'SCHEMA_02', label: '02' },
  { value: 'SCHEMA_03', label: '03' },
  { value: 'SCHEMA_04', label: '04' },
  { value: 'SCHEMA_05', label: '05' },
  { value: 'SCHEMA_06', label: '06' },
  { value: 'SCHEMA_07', label: '07' },
  { value: 'SCHEMA_08', label: '08' },
  { value: 'SCHEMA_09', label: '09' },
]

const iconBaseUrl = 'https://render.albiononline.com/v1/guild/logo.png'
const defaultValues = {
  type: 'PASSIVE_GUILD_UNRANKED',
  symbol: 'GUILDSYMBOL_001',
  symbolColor: 1,
  symbolScale: 1,
  symbolOffsetY: 0,
  schema: 'SCHEMA_01',
  primarySchemaColor:1,
  secondarySchemaColor: 2,
}

function App() {
  const [form] = Form.useForm();
  const [, copy] = useCopyToClipboard()
  const [messageApi, contextHolder] = message.useMessage();
  const [iconUrl, setIconUrl] = useState(`${iconBaseUrl}?${new URLSearchParams(defaultValues).toString()}`)
  const [inputUrl, setInputUrl] = useState(`${iconBaseUrl}?${new URLSearchParams(defaultValues).toString()}`)
  const [isLoadImage, setIsLoadImage] = useState(false)
  const setDebounceIconUrl = useDebounceCallback(setIconUrl, 500)
  const setDebounceIsLoadImage = useDebounceCallback(setIsLoadImage, 500)

  useEffect(() => {
    const params = new URLSearchParams(iconUrl.split('?')[1]);
    form.setFieldsValue({
      symbol: params.get('symbol'),
      symbolColor: Number(params.get('symbolColor')),
      symbolScale: Number(params.get('symbolScale')),
      symbolOffsetY: Number(params.get('symbolOffsetY')),
      schema: params.get('schema'),
      primarySchemaColor: Number(params.get('primarySchemaColor')),
      secondarySchemaColor: Number(params.get('secondarySchemaColor')),
    })
  }, [form, iconUrl])

  
  const handleChangeUrl = (e) => {
    setInputUrl(e.target.value)
    setDebounceIconUrl(e.target.value)
    setDebounceIsLoadImage(true)
  }

  const handleReset = () => {
    setIsLoadImage(true)
    setIconUrl(`${iconBaseUrl}?${new URLSearchParams(defaultValues).toString()}`)
    messageApi.success('已重製')
  }

  const handleCopy = () => {
    copy(iconUrl).then(() => {
      messageApi.success('已複製')
    })
  }

  const handleImageError = () => {
    messageApi.error('圖片參數錯誤，請在調整參數後試試')
  }
  
  const handleImageLoad = () => {
    setIsLoadImage(false)
  };

  return (
    <>
      {contextHolder}
      <Card>
        <Space.Compact block>
          <Input addonBefore="LOGO 連結" value={inputUrl} disabled={isLoadImage} onChange={handleChangeUrl}/>
          <Tooltip title="重製">
            <Button icon={<RedoOutlined />} onClick={handleReset} />
          </Tooltip>
          <Tooltip title="複製">
            <Button icon={<CopyOutlined />} onClick={handleCopy} />
          </Tooltip>
        </Space.Compact>
        <Divider orientation="left">Albion Guild Logo Maker</Divider>
        <Flex align="center" justify="space-around">
          <Form
            form={form}
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 18 }}
            style={{width: 580}}
            onValuesChange={(_changedValues, allValues) => {
              const searchParams = new URLSearchParams({
                type: 'PASSIVE_GUILD_UNRANKED',
                ...allValues
              });
              setDebounceIconUrl(`${iconBaseUrl}?${searchParams.toString()}`)
              setDebounceIsLoadImage(true)
            }}
            disabled={isLoadImage}
          >
            <Form.Item label="圖標" name="symbol">
              <Select options={symbolOptions} />
            </Form.Item>
            <Form.Item label="圖標顏色" name="symbolColor">
              <Radio.Group>
                {colorList.map(color => (
                  <Radio key={color.value} value={color.value} style={{alignItems: 'center'}}>
                    <div className='color-block' style={{background: `rgb(${color.rgb.join(',')})`}}></div>
                  </Radio>
                ))}
              </Radio.Group>
            </Form.Item>
            <Form.Item label="圖標大小" name="symbolScale">
              <Slider step={0.01} max={1.5} min={-0.5}/>
            </Form.Item>
            <Form.Item label="圖標位移" name="symbolOffsetY">
              <Slider step={0.01} max={0.5} min={-0.5}/>
            </Form.Item>
            <Form.Item label="背景圖示" name="schema">
              <Select options={schemaOptions} />
            </Form.Item>
            <Form.Item label="背景主色" name="primarySchemaColor">
              <Radio.Group>
                {colorList.map(color => (
                  <Radio key={color.value} value={color.value} style={{alignItems: 'center'}}>
                    <div className='color-block' style={{background: `rgb(${color.rgb.join(',')})`}}></div>
                  </Radio>
                ))}
              </Radio.Group>
            </Form.Item>
            <Form.Item label="背景副色" name="secondarySchemaColor">
              <Radio.Group>
                {colorList.map(color => (
                  <Radio key={color.value} value={color.value} style={{alignItems: 'center'}}>
                    <div className='color-block' style={{background: `rgb(${color.rgb.join(',')})`}}></div>
                  </Radio>
                ))}
              </Radio.Group>
            </Form.Item>
          </Form>
          <Image 
            rootClassName="image"
            style={{ display: isLoadImage ? 'none' : 'block'}}
            src={iconUrl}
            preview={false}
            placeholder={
              <Flex style={{ height: '100%' }} justify="center" align="center">
                <Spin size="large" />
              </Flex>
            }
            fallback="data:image/png;base64,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"
            onError={handleImageError}
            onLoad={handleImageLoad}
          />
        </Flex>
      </Card>
    </>
  )
}

export default App
