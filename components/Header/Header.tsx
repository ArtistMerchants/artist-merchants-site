import { useSiteStore } from 'hooks/useSiteStore'
import { usePathname } from 'next/navigation'

import { Nav } from '../Global/Nav'
import { AnimatePresence } from 'framer-motion'
import { ClientToolsHeader } from 'components/Header/ClientToolsHeader'
import { HeaderWrapper } from '../Global/HeaderWrapper'
import { InfoHeader } from './InfoHeader'
import { ArchiveHeader } from './ArchiveHeader'
import { ViewSelector } from 'components/Global/ViewSelector'
import { useMemo } from 'react'
import { ClientToolsFilters } from 'components/ClientTools/ClientToolsFilters'
import { useRouter } from 'next/router'
import { ProjectHeader } from './ProjectHeader'

export const Header = ({
  categories,
  materials,
  information,
  activeMaterial,
  activeProject,
}) => {
  const path = usePathname()
  const router = useRouter()

  const viewSelectorActive = useMemo(() => {
    return (
      router.route === '/archive/categories/[slug]' ||
      router.route === '/client-tools/[slug]'
    )
  }, [path])

  return (
    <HeaderWrapper>
      <div className="flex flex-col gap-10">
        <Nav />
        <AnimatePresence>
          {router.route === '/archive/[slug]' ? (
            <ArchiveHeader
              className="md:hidden"
              categories={categories}
              activeCategories={activeProject?.categories}
              key="archive-project"
            />
          ) : null}
        </AnimatePresence>
      </div>
      <AnimatePresence mode="wait" initial={false}>
        {path === '/information' ? (
          <InfoHeader data={information} key="info" />
        ) : null}

        {path?.includes('/archive') ? (
          <ArchiveHeader
            className={`${
              router.route === '/archive/[slug]' ? 'hidden md:block' : ''
            }`}
            categories={categories}
            activeCategories={activeProject?.categories}
            key="archive"
          />
        ) : null}

        {path?.includes('/client-tools') ? (
          <ClientToolsHeader materials={materials} key="client-tools" />
        ) : null}
      </AnimatePresence>
      <AnimatePresence mode="wait" initial={false}>
        {viewSelectorActive ? <ViewSelector key="view-selector" /> : null}

        {path !== '/client-tools' && path?.includes('/client-tools') ? (
          <ClientToolsFilters
            {...activeMaterial}
            key={`client-tools-filters`}
          />
        ) : null}

        {router.route === '/archive/[slug]' ? (
          <ProjectHeader {...activeProject} key={`project-header`} />
        ) : null}
      </AnimatePresence>
    </HeaderWrapper>
  )
}
