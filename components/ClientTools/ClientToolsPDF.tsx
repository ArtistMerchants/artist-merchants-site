import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
} from '@react-pdf/renderer'
import { urlForImage } from 'lib/sanity.image'

export const ClientToolsPDF = ({ projects, materials, techniques, title }) => {
  return (
    <Document>
      <Page size="A4" style={styles.body}>
        <View style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <Text style={styles.title}>Category: {title}</Text>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              gap: '10px',
              justifyContent: 'space-between',
            }}
          >
            <View
              style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}
            >
              <Text style={styles.title}>Materials</Text>
              <View>
                {materials?.map((material) => {
                  return (
                    <Text key={material} style={styles.text}>
                      {material}
                    </Text>
                  )
                })}
              </View>
            </View>
            <View
              style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}
            >
              <Text style={styles.title}>Techniques</Text>
              <View>
                {techniques?.map((technique) => {
                  return (
                    <Text key={technique} style={styles.text}>
                      {technique}
                    </Text>
                  )
                })}
              </View>
            </View>
          </View>
        </View>
        <View style={styles.grid}>
          {projects?.map((project) => {
            const image = project.media[0]
            const url = urlForImage(image).auto('format').width(800).url()
            return (
              <View key={project.id} style={styles.gridItem}>
                <Image
                  src={url}
                  style={{
                    width: '100%',
                    aspectRatio: image?.aspectRatio,
                  }}
                />
              </View>
            )
          })}
        </View>
      </Page>
    </Document>
  )
}

const styles = StyleSheet.create({
  body: {
    backgroundColor: '#F8F8F8',
    padding: 20,
  },
  grid: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 10,
    width: '100%',
  },
  gridItem: {
    width: '49.05%',
  },
  title: {
    fontSize: 10,
    lineHeight: 1.1,
    textTransform: 'uppercase',
  },
  text: {
    fontSize: 12,
    lineHeight: 1.1,
  },
})
