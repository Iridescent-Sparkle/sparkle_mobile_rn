import { Button, Card } from '@fruits-chain/react-native-xiaoshu'
import { useNavigation, useRoute } from '@react-navigation/native'
import React, { useEffect, useRef } from 'react'
import { BackHandler, FlatList, View } from 'react-native'
import Form from '@/core/components/Form'
import Page from '@/core/components/Page'
import { create } from '@/core/styleSheet'
import LocationSalaryCard from '@/page/boss/recruit-search/location-salary-card'
import MultiSelectCard from '@/page/boss/recruit-search/multi-select-card'
import FilterTabs from '@/page/boss/recruit-search/recruit-filter-tabs'
import SingleSelectCard from '@/page/boss/recruit-search/single-select-card'
import { useJobStore } from '@/store/job'

function FilterOptions() {
  const form = Form.useForm()
  const route = useRoute<{ key: any, name: any, params: { keyword: string, setFilterValues: (params: Record<string, any>) => void } }>()
  const navigation = useNavigation()

  const listRef = useRef<FlatList>(null)

  const jobStore = useJobStore()

  const listData = [
    {
      id: '1',
      title: '位置和薪酬',
      component: <LocationSalaryCard />,
    },
    {
      id: '2',
      title: '工作类型',
      component: <SingleSelectCard title="工作类型" name="jobCategoryId" data={jobStore.jobCategoryOptions} />,
    },
    {
      id: '3',
      title: '岗位职级',
      component: <MultiSelectCard title="岗位职级" name="jobLevelId" data={jobStore.jobLevelOptions} />,
    },
    {
      id: '4',
      title: '是否全职',
      component: <SingleSelectCard title="是否全职" name="isFullTime" data={jobStore.jobFullTimeOptions} />,
    },
    {
      id: '5',
      title: '工作经验',
      component: <MultiSelectCard title="工作经验" name="jobExperienceId" data={jobStore.jobExperienceOptions} />,
    },
    {
      id: '6',
      title: '学历要求',
      component: <MultiSelectCard title="学历要求" name="jobEducationId" data={jobStore.jobEducationOptions} />,
    },
    {
      id: '7',
      title: '福利',
      component: <MultiSelectCard title="工作职能" name="jobBonus" data={jobStore.jobBonusOptions} />,
    },
  ]

  const handleResetForm = () => {
    form.setFieldsValue({
      address: '',
      salary: [1, 100],
      jobExperienceId: [],
      jobBonus: [],
      jobCategoryId: null,
      jobLevelId: [],
      isFullTime: [],
    })
  }

  const handleSubmitForm = () => {
    const values = form.getFieldsValue()

    route.params.setFilterValues({
      filter: values,
      keyword: route.params.keyword,
    })
    navigation.goBack()
  }

  useEffect(() => {
    form.setFieldsValue({
      salary: [1, 100],
    })
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        return true
      },
    )
    return () => backHandler.remove()
  }, [])

  return (
    <Page isScrollView={false} conntentStyle={styles.container}>
      <View>
        <FilterTabs listRef={listRef} data={listData} />
      </View>
      <View style={styles.list}>
        <Form form={form}>
          <FlatList ref={listRef} data={listData} renderItem={itemItem => itemItem.item.component} keyExtractor={item => item.id} />
        </Form>
      </View>
      <Card>
        <View style={styles.buttonWrapper}>
          <Button type="ghost" style={styles.button} onPress={handleResetForm}>重置</Button>
          <Button style={styles.button} onPress={handleSubmitForm}>确认</Button>
        </View>
      </Card>
    </Page>
  )
}

const styles = create({
  container: {
    paddingHorizontal: 0,
  },
  tabBar: {
    height: 114,
    paddingHorizontal: 0,
  },
  list: {
    flex: 1,
    paddingTop: 32,
    paddingHorizontal: 24,
  },
  buttonWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  button: {
    width: 320,
    borderRadius: 40,
  },
})

export default FilterOptions
